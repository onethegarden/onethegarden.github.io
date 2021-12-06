import { Edge } from "../pages/index";

export const useCategory = (edges: Edge[]) =>
  edges.reduce(
    (
      list: { [key: string]: number },
      {
        node: {
          frontmatter: { categories },
        },
      }: { node: { frontmatter: { categories: string[] } } }
    ) => {
      categories.forEach((category) => {
        if (list[category] === undefined) list[category] = 1;
        else list[category]++;
      });

      list["All"]++;

      return list;
    },
    { All: 0 }
  );
