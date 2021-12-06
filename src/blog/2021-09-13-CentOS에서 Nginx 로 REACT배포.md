---
layout: post
categories: ['centOS']
title: CentOS에서 Nginx로 REACT배포
---

회사에서 테스트 서버는 직접 세팅해야 한다고 해서 다른 분의 CentOS가상 서버를 빌려서 테스트 해봤다. OS세팅이 되면 직접 세팅할 거라, 시행착오를 겪었던 내용을 정리한다.

## Node 설치

1. yum repository에 nodeSource 추가

   ```shell
   curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
   ```

2. intall node.js

   ```shell
   sudo yum install nodejs
   ```

## Nginx 설치

1. 외부 저장소 추가

   ```shell
   vi /etc/yum.repos.d/nginx.repo
   ```

   저거 열고 이거 붙여넣기, centos/7 이부분은 os/version

   ```shell
   [nginx]
   name=nginx repo
   baseurl=http://nginx.org/packages/centos/7/$basearch/
   gpgcheck=0
   enabled=1
   ```

2. 방화벽 포트 개방, 8080 열어줌

   ```shell
   firewall-cmd --permanent --zone=public --add-port=8080/tcp
   ```

   리로드

   ```shell
   firewall-cmd --reload
   ```

   열린 포트 리스트 확인

   ```shell
   firewall-cmd --list-ports
   ```

   (Firewall 없을 경우 설치, 사용하게 허용)

   ```shell
   sudo yum install firewalld
   sudo systemctl enable firewalld
   ```

3. Nginx 포트 설정 /etc/nginx/conf.d/default.conf

```shell
sudo vi /etc/nginx/conf.d/default.conf
```

```shell
server {
    listen       8080;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

4. Nginx 시작

   ```shell
   systemctl start nginx
   systemctl enable nginx
   ```

   해당 포트로 접근했을 때 연결됐는지 nginx 화면 뜨는지 확인

### build된 파일을 쓸 디렉토리 설정

파일 열어서 location 수정

```shell
sudo vi /etc/nginx/conf.d/default.conf
```

```shell
server {
    listen       8080;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /home/onethegarden/myapp/build;
        index  index.html index.htm;
    }
}
```

### 403 forbidden 문제 해결

/home/onethegarden/ 에 권한이 없어서 생기는 일

```shell
sudo chmod 755 /home/onethegarden
```

## 그 외 사용했던 명령어

- 외부아이피 확인

  ```
  wget http://ifconfig.me
  ```

- 해당 포트 상태 확인

  ```
  netstat -aln | grep 8080
  ```
