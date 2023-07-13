import { useUserStore } from "@/store/module/user";

const userStore = useUserStore();

export const isHasButton = (app: any) => {
  app.directive("has", {
    mounted(el: any, options: any) {
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el);
      }
      console.log(123);
    },
  });
};
