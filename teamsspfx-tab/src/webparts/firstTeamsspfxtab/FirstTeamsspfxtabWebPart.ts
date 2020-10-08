import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './FirstTeamsspfxtabWebPart.module.scss';
import * as strings from 'FirstTeamsspfxtabWebPartStrings';

export interface IFirstTeamsspfxtabWebPartProps {
  description: string;
}

export default class FirstTeamsspfxtabWebPart extends BaseClientSideWebPart <IFirstTeamsspfxtabWebPartProps> {

  public render(): void {
    let teamsMessage: string = `<p class="${styles.description}">Welcome to SharePoint!</p>`;

    if (this.context.sdks.microsoftTeams) {
    teamsMessage = `
    <p class="${styles.description}">Welcome to Teams!</p>
    <p class="${ styles.description}">Team Name - ${escape(this.context.sdks.microsoftTeams.context.teamName)}</p>
    <p class="${ styles.description}">Channel Name - ${escape(this.context.sdks.microsoftTeams.context.channelName)}</p>
    <p class="${ styles.description}">Group Id - ${escape(this.context.sdks.microsoftTeams.context.groupId)}</p>
    <p class="${ styles.description}">Team Site Url - ${escape(this.context.sdks.microsoftTeams.context.teamSiteUrl)}</p>`;
    }

    this.domElement.innerHTML = `
      <div class="${ styles.firstTeamsspfxtab }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <p class="${ styles.description }">${teamsMessage}</p>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [
          {
            groupName: strings.BasicGroupName,
            groupFields: [
              PropertyPaneTextField('description', {
                label: strings.DescriptionFieldLabel
              })
            ]
          }
        ]
      }
    ]
  };
}
}
