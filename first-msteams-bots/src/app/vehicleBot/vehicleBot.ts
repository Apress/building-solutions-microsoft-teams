import {
    TeamsActivityHandler,
    TurnContext,
    MessageFactory,
    CardFactory, MessagingExtensionAction, MessagingExtensionActionResponse, MessagingExtensionAttachment
} from "botbuilder";
import { find, sortBy } from "lodash";

import * as Util from "util";
const TextEncoder = Util.TextEncoder;

import * as debug from "debug";
const log = debug("msteams");

export class VehicleBot extends TeamsActivityHandler {
    constructor() {
        super();
    }
    protected handleTeamsMessagingExtensionFetchTask(context: TurnContext, action: MessagingExtensionAction): Promise<MessagingExtensionActionResponse> {
        // load vehicle & sort them by their order
        const vehicles: any = require("./vehicles.json");
        const sortedvehicles: any = sortBy(vehicles, ["id"])
            .map((vehicle) => {
                return { "value": vehicle.id, "title": vehicle.name }
            });

        // load card template
        const adaptiveCardSource: any = require("./vehicleSelectorCard.json");
        // locate the vehicle selector
        let vehicleChoiceSet: any = find(adaptiveCardSource.body, { "id": "vehicleSelector" });
        // update choice set with vehicles
        vehicleChoiceSet.choices = sortedvehicles;
        // load the adaptive card
        const adaptiveCard = CardFactory.adaptiveCard(adaptiveCardSource);

        let response: MessagingExtensionActionResponse = <MessagingExtensionActionResponse>{
            task: {
                type: "continue",
                value: {
                    card: adaptiveCard,
                    title: 'Vehicle Selector',
                    height: 150,
                    width: 500
                }
            }
        };

        return Promise.resolve(response);
    }

    protected handleTeamsMessagingExtensionSubmitAction(context: TurnContext, action: MessagingExtensionAction): Promise<MessagingExtensionActionResponse> {
        switch (action.commandId) {
            case 'vehicleExpanderAction':
                // load Vehicles
                const vehicles: any = require("./vehicles.json");
                // get the selected vehicle
                const selectedVehicle: any = vehicles.filter((vehicle) => vehicle.id === action.data.vehicleSelector)[0];
                const adaptiveCard = this.getVehicleDetailCard(selectedVehicle);

                // generate the response
                return Promise.resolve(<MessagingExtensionActionResponse>{
                    composeExtension: {
                        type: "result",
                        attachmentLayout: "list",
                        attachments: [adaptiveCard]
                    }
                });
                break;
            default:
                throw new Error('NotImplemented');
        }
    }

    private getVehicleDetailCard(selectedVehicle: any): MessagingExtensionAttachment {
        // load display card
        const adaptiveCardSource: any = require("./vehicleDisplayCard.json");

        // update vehicle fields in display card
        adaptiveCardSource.actions[0].url = selectedVehicle.wikiLink;
        find(adaptiveCardSource.body, { "id": "cardHeader" }).items[0].text = selectedVehicle.name;
        const cardBody: any = find(adaptiveCardSource.body, { "id": "cardBody" });
        find(cardBody.items, { "id": "vehicleSummary" }).text = selectedVehicle.summary;
        // return the adaptive card
        return CardFactory.adaptiveCard(adaptiveCardSource);
    }

}
