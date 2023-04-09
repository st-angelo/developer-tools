import { c as create_ssr_component, v as validate_component, b as each, d as add_attribute, e as escape } from "../../chunks/index3.js";
const Animate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Animate, "Animate").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="${"flex min-h-screen w-full items-center justify-center"}"><div class="${"flex flex-col items-center justify-center gap-5 rounded-lg p-10 shadow-lg drop-shadow-lg"}"><h2 class="${"text-lg font-bold"}">Developer widgets</h2>
			<div class="${"flex flex-col gap-3"}">${each(data.tools, (tool) => {
        return `<a class="${"rounded-lg bg-green-600 px-5 py-3 font-bold text-white"}"${add_attribute("href", tool.route, 0)}>${escape(tool.name)}</a>`;
      })}</div></div></div>`;
    }
  })}`;
});
export {
  Page as default
};
