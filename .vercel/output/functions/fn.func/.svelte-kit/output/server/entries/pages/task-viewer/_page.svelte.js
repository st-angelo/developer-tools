import { c as create_ssr_component, d as add_attribute, e as escape, a as subscribe, v as validate_component, b as each } from "../../../chunks/index3.js";
import { n as navigating, p as page } from "../../../chunks/stores.js";
import "../../../chunks/utils.js";
import { g as getAtlassianIssueUrl } from "../../../chunks/functions.js";
const Task = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { task } = $$props;
  if ($$props.task === void 0 && $$bindings.task && task !== void 0)
    $$bindings.task(task);
  return `<div class="${"flex w-full flex-col gap-1 rounded-md p-2 text-sm shadow-md hover:bg-[#f5f5f5] xs:flex-row"}"><div class="${"flex cursor-pointer items-center justify-between"}"><div class="${"flex items-center gap-2"}">
			<img class="${"h-4 w-4"}"${add_attribute("title", task.issue?.fields.issuetype?.name, 0)}${add_attribute("src", task.issue?.fields.issuetype?.iconUrl, 0)}${add_attribute("alt", `${task.issue?.fields.issuetype?.name} icon`, 0)}>
			<a${add_attribute("href", getAtlassianIssueUrl(task.issueKey), 0)} target="${"_blank"}" rel="${"noopener noreferrer"}" class="${"text-lg font-bold text-sky-500"}"${add_attribute("title", task.issue?.fields.summary, 0)}>${escape(task.issueKey)}</a></div>
		
		<div class="${"grow self-stretch"}"></div>
		<div class="${"flex items-center gap-2"}"><div class="${[
    "select-none rounded-lg border-[1px] border-sky-500 bg-sky-500 px-2 font-semibold text-white",
    (task.completed ? "bg-gray-500" : "") + " " + (task.completed ? "border-gray-500" : "")
  ].join(" ").trim()}"${add_attribute("title", "Status", 0)}>${escape(task.issue?.fields.status.name)}</div>
			<form method="${"post"}" action="${"?/removeTask"}" class="${""}"><input id="${"id"}" name="${"id"}" hidden${add_attribute("value", task.id, 0)}>
				<button ${""} type="${"submit"}" title="${"Remove"}" class="${"text-red-500 disabled:text-gray-500"}"><iconify-icon icon="${"mdi:trash-can-empty"}"${add_attribute("width", 20, 0)}></iconify-icon></button></form></div></div>
	${``}</div>`;
});
function getColorClasses(type) {
  switch (type) {
    case "error":
      return "bg-red-100 text-red-600";
    case "warning":
      return "bg-orange-100 text-orange-600";
    default:
      return "bg-lime-100 text-lime-600";
  }
}
const Message = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { message } = $$props;
  let { onClose } = $$props;
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0)
    $$bindings.onClose(onClose);
  return `<div${add_attribute("class", `flex items-center justify-between rounded-md p-2 shadow-md ${getColorClasses(message.type)}`, 0)}><div class="${"flex items-center gap-2 rounded-md"}">${message.type === "error" ? `<iconify-icon icon="${"material-symbols:error-rounded"}"${add_attribute("width", 20, 0)}></iconify-icon>` : `${message.type === "warning" ? `<iconify-icon icon="${"material-symbols:warning-rounded"}"${add_attribute("width", 20, 0)}></iconify-icon>` : `<iconify-icon icon="${"material-symbols:info-rounded"}"${add_attribute("width", 20, 0)}></iconify-icon>`}`}
		<span class="${"text-sm"}"><!-- HTML_TAG_START -->${message.content}<!-- HTML_TAG_END --></span></div>
	<button class="${"flex"}"><iconify-icon icon="${"material-symbols:close-rounded"}"${add_attribute("width", 20, 0)}></iconify-icon></button></div>`;
});
const Pagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let lastPage;
  let { page: page2 } = $$props;
  let { size = 5 } = $$props;
  let { total } = $$props;
  let { onPageChange } = $$props;
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  if ($$props.onPageChange === void 0 && $$bindings.onPageChange && onPageChange !== void 0)
    $$bindings.onPageChange(onPageChange);
  lastPage = Math.ceil(total / size);
  return `<div class="${"flex items-center gap-2"}"><button ${page2 <= 1 ? "disabled" : ""} class="${"text-sky-500 disabled:text-gray-500"}"><iconify-icon icon="${"solar:map-arrow-left-bold"}"></iconify-icon></button>

	<span class="${"italic"}">${escape((page2 - 1) * size + 1 <= total ? (page2 - 1) * size + 1 : total)} ... ${escape(page2 * size <= total ? page2 * size : total)} of
		${escape(total)}</span>

	<button ${page2 >= lastPage ? "disabled" : ""} class="${"text-sky-500 disabled:text-gray-500"}"><iconify-icon icon="${"solar:map-arrow-right-bold"}"></iconify-icon></button></div>`;
});
const TaskFilters = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { completed } = $$props;
  let { direction } = $$props;
  let { onChangeCompleted } = $$props;
  let { onChangeDirection } = $$props;
  if ($$props.completed === void 0 && $$bindings.completed && completed !== void 0)
    $$bindings.completed(completed);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
    $$bindings.direction(direction);
  if ($$props.onChangeCompleted === void 0 && $$bindings.onChangeCompleted && onChangeCompleted !== void 0)
    $$bindings.onChangeCompleted(onChangeCompleted);
  if ($$props.onChangeDirection === void 0 && $$bindings.onChangeDirection && onChangeDirection !== void 0)
    $$bindings.onChangeDirection(onChangeDirection);
  $$unsubscribe_navigating();
  return `<div class="${"mb-2 flex items-center justify-between bg-sky-100 px-2 py-2"}"><div class="${"flex items-center gap-2"}"><button ${Boolean($navigating) ? "disabled" : ""} class="${[
    "rounded-xl border-[1px] border-sky-500 px-2 font-semibold text-sky-500",
    (completed === null ? "bg-sky-500" : "") + " " + (completed === null ? "text-white" : "")
  ].join(" ").trim()}">All</button>
		<button ${Boolean($navigating) ? "disabled" : ""} class="${[
    "rounded-xl border-[1px] border-sky-500 px-2 font-semibold text-sky-500",
    (completed === 1 ? "bg-sky-500" : "") + " " + (completed === 1 ? "text-white" : "")
  ].join(" ").trim()}">Completed</button></div>
	<div class="${"flex items-center"}"><button ${Boolean($navigating) ? "disabled" : ""} class="${"flex"}"><iconify-icon icon="${"ph:arrow-bend-left-up-bold"}"${add_attribute("class", direction === "asc" ? "text-sky-500" : "", 0)}></iconify-icon></button>
		<button ${Boolean($navigating) ? "disabled" : ""} class="${"flex"}"><iconify-icon icon="${"ph:arrow-bend-right-down-bold"}"${add_attribute("class", direction === "desc" ? "text-sky-500" : "", 0)}></iconify-icon></button></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tasks;
  let showMessage;
  let $pageStore, $$unsubscribe_pageStore;
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_pageStore = subscribe(page, (value) => $pageStore = value);
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { data } = $$props;
  let appCode = "";
  let route = "";
  let completed = 0;
  let page$1 = 1;
  let direction = "asc";
  let hideMessageTimeout;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  tasks = data.tasks;
  showMessage = Boolean($pageStore.form?.message);
  {
    {
      if ($pageStore.form?.message && !$pageStore.form.message.persistent) {
        clearTimeout(hideMessageTimeout);
        hideMessageTimeout = setTimeout(() => showMessage = false, 3e3);
      }
    }
  }
  {
    console.log(appCode, route);
  }
  $$unsubscribe_pageStore();
  $$unsubscribe_navigating();
  return `

<div class="${"relative flex h-screen w-full flex-col overflow-hidden"}">${`<div class="${"flex justify-between px-2 py-1"}"><div class="${"flex items-center gap-1"}"><span class="${"font-semibold"}">Page:</span>
				<span${add_attribute("title", route, 0)} class="${"max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm italic"}">${escape(route)}</span></div>
			<button class="${"flex text-sky-500"}" title="${"Add"}"><iconify-icon icon="${"ic:round-plus"}"${add_attribute("width", 25, 0)}></iconify-icon></button></div>
		${``}
		${validate_component(TaskFilters, "TaskFilters").$$render(
    $$result,
    {
      completed,
      direction,
      onChangeCompleted: (value) => {
        completed = value;
        page$1 = 1;
      },
      onChangeDirection: (value) => {
        direction = value;
        page$1 = 1;
      }
    },
    {},
    {}
  )}
		<div class="${"scrollable flex grow items-center justify-center overflow-y-auto overflow-x-hidden px-3"}">${$navigating ? `<div class="${"dot-flashing"}"></div>` : `${tasks ? `<div class="${"flex w-full flex-col items-center gap-2 self-start"}">${tasks.length > 0 ? `${each(tasks, (task) => {
    return `${validate_component(Task, "Task").$$render($$result, { task }, {}, {})}`;
  })}` : `<i class="${"mt-2 text-sm"}">No tasks associated with this page &amp; filters</i>`}</div>` : `<span>${escape($pageStore.data.error)}</span>`}`}</div>
		<div class="${"flex justify-center p-1"}">${validate_component(Pagination, "Pagination").$$render(
    $$result,
    {
      page: page$1,
      total: data.total,
      onPageChange: (value) => page$1 = value
    },
    {},
    {}
  )}</div>`}
	${showMessage ? `<div class="${"absolute bottom-2 w-full p-3"}">${validate_component(Message, "Message").$$render(
    $$result,
    {
      message: $pageStore.form?.message,
      onClose: () => showMessage = false
    },
    {},
    {}
  )}</div>` : ``}</div>`;
});
export {
  Page as default
};
