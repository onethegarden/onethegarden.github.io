---
layout: post
categories: ['next.js']
path: next-jest-configuration
title: (next.js 12.1) zero configuration jest plugin
---

next.js 12.1 부터 SWC를 사용하여 아주 간단하게(zero-configuration) Jest를 지원해줍니다. 그 이전에 babel로 할 땐 설정해 줘야 할 게 정말 많았었습니다. [링크](https://nextjs.org/docs/testing#setting-up-jest-with-babel)

회사 프로젝트에 적용 후 babel로 설정했을 때는 15초 걸리던 게 SWC로 설정했을 때 8~9초 정도로 단축되었습니다.

관련된 내용을 번역했습니다.

12.1 릴리즈 노트 [https://nextjs.org/blog/next-12-1#zero-configuration-jest-plugin](https://nextjs.org/blog/next-12-1#zero-configuration-jest-plugin)

공식문서 [https://nextjs.org/docs/advanced-features/compiler#jest](https://nextjs.org/docs/advanced-features/compiler#jest)

## 설정이 필요 없는 jest plugin
SWC를 사용하여 설정없이 Jest를 지원

Jest 지원은 이전에 Babel에서 제공했던 설정을 기본으로 Next.js의 아래 기능들과 함께 jest 설정을 간단하게 할 수 있습니다.

- `.css`, `.module.css` ( `.scss` 가 변형된 것), 그리고 image imports를 자동으로 mocking합니다.
- SWC를 사용하여 `transform` 을 자동으로 설정합니다.
- `.env`를 `process.env`에 로드해줍니다.
- **테스트** 시에 `node_modules`를 무시하고 변환합니다.
- 테스트 시에 `.next` 를 무시합니다.
- 테스트 환경의 SWC 변환을 할 수 있게 하는 정보인 `next.config.js`를 불러옵니다.

우선, `npm install next@latest` 로 next.js의 최신 버전으로 업데이트 합니다. 그리고, `jest.config.js` 파일을 업데이트 합니다.

```jsx
// jest.config.js
const nextJest = require('next/jest')

// next.config.js 와 .env 파일을 로드할 수 있는 Next.js 앱 경로를 설정합니다.
const createJestConfig = nextJest({ dir })

// Jest에 전달할 custom 설정들을 합니다.
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}

// createJestConfig는 next/jest가 비동기인 Next.js 설정을 로드할 수 있도록 하기 위함입니다.
module.exports = createJestConfig(customJestConfig)

```

## nextJest 코드
- nextJest 함수의 내용이고, 위에서 설명한 내용들이 코드로 적혀있습니다. 주석으로 그 이유도 잘 적혀있어서 첨부합니다. ([링크](https://github.com/vercel/next.js/blob/647c06b339ccabb5ee583cbdd32e12b8af6b0fd4/packages/next/build/jest/jest.ts))

```jsx
export default function nextJest(options: { dir?: string } = {}) {
  // createJestConfig
  return (customJestConfig: any) => {
    // 이 함수는 jest.config.js가 modules.export 하기 위함이다.
    // jest가 부르고 await한다.
    return async () => {
      let nextConfig
      let jsConfig
      let resolvedBaseUrl
      let isEsmProject = false
      if (options.dir) {
        const resolvedDir = resolve(options.dir)
        const packageConfig = loadClosestPackageJson(resolvedDir)
        isEsmProject = packageConfig.type === 'module'

        nextConfig = await getConfig(resolvedDir)
        loadEnvConfig(resolvedDir, false, Log)
        // TODO: revisit when bug in SWC is fixed that strips `.css`
        const result = await loadJsConfig(resolvedDir, nextConfig)
        jsConfig = result.jsConfig
        resolvedBaseUrl = result.resolvedBaseUrl
      }
      // 비동기 설정이 지원되는지 확인
      const resolvedJestConfig =
        typeof customJestConfig === 'function'
          ? await customJestConfig()
          : customJestConfig

      return {
        ...resolvedJestConfig,

        moduleNameMapper: {
          // Handle CSS imports (with CSS modules)
          // https://jestjs.io/docs/webpack#mocking-css-modules
          '^.+\\.module\\.(css|sass|scss)$':
            require.resolve('./object-proxy.js'),

          // Handle CSS imports (without CSS modules)
          '^.+\\.(css|sass|scss)$': require.resolve('./__mocks__/styleMock.js'),

          // Handle image imports
          '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': require.resolve(
            `./__mocks__/fileMock.js`
          ),

          // Custom한 설정은 기본 설정에 override 될 수 있습니다.
          ...(resolvedJestConfig.moduleNameMapper || {}),
        },
        testPathIgnorePatterns: [
          // node_modules에서는 테스트를 찾지 않습니다.
          '/node_modules/',
          // Next.js build 결과물에 대해서는 테스트를 찾지 않습니다.
          '/.next/',
          // Custom한 설정은 testPathIgnorePatterns 에 추가할 수 있지만, 수정할 수는 없습니다.
          // 이것은 `.next` 와 `node_modules` 가 항상 제외되기 위함입니다.
          ...(resolvedJestConfig.testPathIgnorePatterns || []),
        ],

        transform: {
          // SWC를 사용하여 tests 컴파일
          '^.+\\.(js|jsx|ts|tsx)$': [
            require.resolve('../swc/jest-transformer'),
            {
              nextConfig,
              jsConfig,
              resolvedBaseUrl,
              isEsmProject,
            },
          ],
          // 기본 변환을 추가하고 override 하는 것을 허용한다.
          ...(resolvedJestConfig.transform || {}),
        },

        transformIgnorePatterns: [
          // Next.js의 기본동작을 맞추기 위해 node_modules는 변환시키지 않습니다.
          '/node_modules/',
          // CSS modules 은 Mocking 됐기 때문에 변환시키지 않습니다.
          '^.+\\.module\\.(css|sass|scss)$',

          // Custom한 설정은 testPathIgnorePatterns 에 추가할 수 있지만, 수정할 수는 없습니다.
          // 이것은 항상 `node_modules` 과 .module.css/sass/scss 가 제외되게 하기 위함입니다.
          ...(resolvedJestConfig.transformIgnorePatterns || []),
        ],
      }
    }
  }
}
```