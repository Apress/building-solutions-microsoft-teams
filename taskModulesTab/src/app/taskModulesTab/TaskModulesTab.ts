import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/taskModulesTab/index.html")
@PreventIframe("/taskModulesTab/config.html")
@PreventIframe("/taskModulesTab/remove.html")
export class TaskModulesTab {
}
