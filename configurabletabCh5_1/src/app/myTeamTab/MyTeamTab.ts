import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/myTeamTab/index.html")
@PreventIframe("/myTeamTab/config.html")
@PreventIframe("/myTeamTab/remove.html")
export class MyTeamTab {
}
