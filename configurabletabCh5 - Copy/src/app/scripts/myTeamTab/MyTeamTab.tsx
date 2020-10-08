import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
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
                                <Button onClick={() => alert("It worked!")}>A sample button</Button>
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
}
