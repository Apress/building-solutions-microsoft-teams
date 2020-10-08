import * as React from "react";
import { Provider, Flex, Text, Button, Header, List } from "@fluentui/react-northstar";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

import * as MicrosoftGraphClient from "@microsoft/microsoft-graph-client";
import * as MicrosoftGraph from "microsoft-graph";

/**
 * State for the myTeamTabTab React component
 */
export interface IMyTeamTabState extends ITeamsBaseComponentState {
    entityId?: string;
    useremail?: string;
    TeamID?: string;
    TeamName?: string;
    ChannelID?: string;
    ChannelName?: string;

    accessToken: string;
    messages: MicrosoftGraph.Message[];

}

/**
 * Properties for the myTeamTabTab React component
 */
export interface IMyTeamTabProps {

}

/**
 * Implementation of the My Team Tab content page
 */
export class MyTeamTab extends TeamsBaseComponent<IMyTeamTabProps, IMyTeamTabState> {
    private msGraphClient: MicrosoftGraphClient.Client;
    constructor(props: IMyTeamTabProps, state: IMyTeamTabState) {
        super(props, state);

        state.messages = [];
        state.accessToken = "";

        this.state = state;
    }


    public async componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));
        if (await this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
            microsoftTeams.getContext((context) => {
                microsoftTeams.appInitialization.notifySuccess();
                this.setState({
                    entityId: context.entityId,
                    useremail: context.upn,
                    TeamID: context.teamId,
                    TeamName: context.teamName,
                    ChannelID: context.channelId,
                    ChannelName: context.channelName,

                });
                this.updateTheme(context.theme);
            });
            this.msGraphClient = MicrosoftGraphClient.Client.init({
                authProvider: async (done) => {
                    if (!this.state.accessToken) {
                        const token = await this.getAccessToken();
                        this.setState({
                            accessToken: token
                        });
                    }
                    done(null, this.state.accessToken);
                }
            });
        } else {
            this.setState({
                entityId: "This is not hosted in Microsoft Teams"
            });
        }
    }

    /**
     * The render() method to create the UI of the tab
     */
    public render() {
        return (
            <Provider theme={this.state.theme}>
                <Flex fill={true} column styles={{
                    padding: ".8rem 0 .8rem .5rem"
                }}>
                    <Flex.Item>
                        <Header content="This is your tab" />
                    </Flex.Item>
                    <Flex.Item>
                        <div>

                            <div><Text content={this.state.entityId} /></div>
                            <div>User Email ID : <Text content={this.state.useremail} /></div>
                            <div>Team ID : <Text content={this.state.TeamID} /></div>
                            <div>Team Name : <Text content={this.state.TeamName} /></div>
                            <div>Chanel ID : <Text content={this.state.ChannelID} /></div>
                            <div>Channel Name : <Text content={this.state.ChannelName} /></div>
                            <div>
                                <Button primary
                                    content="Log In"
                                    onClick={this.loginclick}></Button>
                            </div>
                            <div>
                                <Button primary
                                    content="Get My Messages"
                                    onClick={this.handleGetMyMessagesOnClick}></Button>
                                <List selectable>
                                    {
                                        this.state.messages.map(message => (
                                            <List.Item
                                                header={message.receivedDateTime}
                                                content={message.subject}>
                                            </List.Item>
                                        ))
                                    }
                                </List>

                            </div>
                        </div>
                    </Flex.Item>
                    <Flex.Item styles={{
                        padding: ".8rem 0 .8rem .5rem"
                    }}>
                        <Text size="smaller" content="(C) Copyright JPOWER4" />
                    </Flex.Item>
                </Flex>
            </Provider>
        );
    }

    private handleGetMyMessagesOnClick = async (event): Promise<void> => {
        await this.getMessages();
    }

    private async getMessages(promptConsent: boolean = false): Promise<void> {
        if (promptConsent || this.state.accessToken === "") {
            await this.signin(promptConsent);
        }

        this.msGraphClient
            .api("me/messages")
            .select(["receivedDateTime", "subject"])
            .top(15)
            .get(async (error: any, rawMessages: any, rawResponse?: any) => {
                if (!error) {
                    this.setState(Object.assign({}, this.state, {
                        messages: rawMessages.value
                    }));
                    Promise.resolve();
                } else {
                    console.error("graph error", error);
                    // re-sign in but this time force consent
                    await this.getMessages(true);
                }
            });
    }

    private async signin(promptConsent: boolean = false): Promise<void> {
        const token = await this.getAccessToken(promptConsent);

        this.setState({
            accessToken: token
        });

        Promise.resolve();
    }

    private async getAccessToken(promptConsent: boolean = false): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            microsoftTeams.authentication.authenticate({
                url: window.location.origin + "/auth-start.html",
                width: 600,
                height: 535,
                successCallback: (accessToken: string) => {
                    resolve(accessToken);
                },
                failureCallback: (reason) => {
                    reject(reason);
                }
            });

        });
    }

    private loginclick() {
        microsoftTeams.authentication.authenticate({
            url: window.location.origin + "/tab-auth/silent-start",
            width: 600,
            height: 535,
            successCallback: (result) =>{
                // AuthenticationContext is a singleton
                let authContext = new AuthenticationContext();
                let idToken = authContext.getCachedToken(config.clientId);
                if (idToken) {
                    showProfileInformation(idToken);
                } else {
                    console.error("Error getting cached id token. This should never happen.");
                    // At this point we have to get the user involved, so show the login button
                    $("#btnLogin").css({ display: "" });
                };
            },
            failureCallback: function (reason) {
                console.log("Login failed: " + reason);
                if (reason === "CancelledByUser" || reason === "FailedToOpenWindow") {
                    console.log("Login was blocked by popup blocker or canceled by user.");
                }
            }
        });
    }
}




}
