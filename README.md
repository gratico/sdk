# gratico SDK

### Example

```
import { IBot } from "@gratico/sdk";

export const vueBot: IBot = {
  id: "vue",
  trigger: "vue",
  config: {
    schema: {},
  },
  async instructions(prompt, config) {
    return [
      "Create the component using vue framework(https://vuejs.org/) and by using JSX with typescript instead of Single File Component. Add the jsx comment/annotation to the top of the file.",
    ];
  },
  output: {
    async processor(str) {
      return {
        raw: str,
        formatted: str,
        actions: [],
        summary: {
          formatted: "created with vue",
        },
      };
    },
  },
};
``
```
