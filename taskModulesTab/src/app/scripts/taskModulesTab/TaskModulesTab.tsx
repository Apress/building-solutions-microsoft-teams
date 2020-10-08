import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import { TextField, ITextFieldStyles } from "@fluentui/react";
/**
 * State for the taskModulesTabTab React component
 */
export interface ITaskModulesTabState extends ITeamsBaseComponentState {
    entityId?: string;
    youTubeVideoId?: string;
    name?: string;
    email?: string;
    designation?: string;
}

/**
 * Properties for the taskModulesTabTab React component
 */
export interface ITaskModulesTabProps {

}

/**
 * Implementation of the Task Modules content page
 */
export class TaskModulesTab extends TeamsBaseComponent<ITaskModulesTabProps, ITaskModulesTabState> {

    public async componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));


        if (await this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
            microsoftTeams.getContext((context) => {
                microsoftTeams.appInitialization.notifySuccess();
                this.setState({
                    entityId: context.entityId,
                    youTubeVideoId: "eSJ-dVp83ks"
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
        const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 250 } };
        return (
            <Provider theme={this.state.theme}>
                <Flex column gap="gap.smaller">
                    <Header>Task Module Demo</Header>
                    <TextField label="Enter your youtube Video ID" value={this.state.youTubeVideoId} styles={narrowTextFieldStyles} onChange={(event, value) => { this.setState({ youTubeVideoId: String(value) }); }} />
                    <Button content="Show Video" primary onClick={this.onShowVideo}></Button>
                    <Button content="Get information" primary onClick={this.ongetEmployeeInfo}></Button>
                    <Button content="Get information (AdaptiveCard)" primary onClick={this.onGetAdaptiveCard}></Button>
                    <Text>{this.state.name}</Text>
                    <Text>{this.state.email}</Text>
                    <Text>{this.state.designation}</Text>
                </Flex>
            </Provider>
        );
    }

    private onGetAdaptiveCard = (event: React.MouseEvent<HTMLButtonElement>): void => {
        // load adaptive card
        const adaptiveCard: any = require("./customform.json");
        const taskModuleInfo = {
            title: "Custom Form",
            card: adaptiveCard,
            width: 500,
            height: 500
        };
        const submitHandler = (err: string, result: any): void => {
            this.setState(Object.assign({}, this.state, {
                name: `Name : ${result.name}`,
                email: `Email ID : ${result.email}`,
                designation: `Designation : ${result.designation}`
            }));

        };
        microsoftTeams.tasks.startTask(taskModuleInfo, submitHandler);
    }

    private onShowVideo = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const taskModuleInfo = {
            title: "YouTube Player",
            url: this.appRoot() + `/taskModulesTab/player.html?vid=${this.state.youTubeVideoId}`,
            width: 1000,
            height: 700
        };
        microsoftTeams.tasks.startTask(taskModuleInfo);
    }

    private ongetEmployeeInfo = (event: React.MouseEvent<HTMLButtonElement>): void => {

        const taskInfo = {
            url: this.appRoot() + `/taskModulesTab/getinfo.html`,
            title: "Custom Form",
            height: 300,
            width: 400,
            
        };

        const submitHandler = (err, result) => {

            this.setState(Object.assign({}, this.state, {
                name: `Name : ${result.name}`,
                email: `Email ID : ${result.email}`,
                designation: `Designation : ${result.designation}`
            }));

        };

        microsoftTeams.tasks.startTask(taskInfo, submitHandler);
    }

    private appRoot(): string {
        if (typeof window === "undefined") {
            return "https://{{HOSTNAME}}";
        } else {
            return window.location.protocol + "//" + window.location.host;
        }
    }
}
