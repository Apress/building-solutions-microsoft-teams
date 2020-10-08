import { BotDeclaration, MessageExtensionDeclaration, PreventIframe } from "express-msteams-host";
import * as debug from "debug";
import { DialogSet, DialogState } from "botbuilder-dialogs";
import { StatePropertyAccessor, CardFactory, TurnContext, MemoryStorage,
    ConversationState, ActivityTypes, TeamsActivityHandler, MessageFactory,
    ChannelInfo, TeamsChannelData, ConversationParameters, teamsGetChannelId,
  Activity, BotFrameworkAdapter, ConversationReference, ConversationResourceResponse
} from "botbuilder";

import HelpDialog from "./dialogs/HelpDialog";
import WelcomeCard from "./dialogs/WelcomeDialog";
import * as Util from "util";
const TextEncoder = Util.TextEncoder;

import ResponseCard from "./ResponseCard";

// Initialize debug logging module
const log = debug("msteams");

/**
 * Implementation for conversationalbot
 */
@BotDeclaration(
    "/api/messages",
    new MemoryStorage(),
    process.env.MICROSOFT_APP_ID,
    process.env.MICROSOFT_APP_PASSWORD)

export class Conversationalbot extends TeamsActivityHandler {
    private readonly conversationState: ConversationState;
    private readonly dialogs: DialogSet;
    private dialogState: StatePropertyAccessor<DialogState>;

    /**
     * The constructor
     * @param conversationState
     */
    public constructor(conversationState: ConversationState) {
        super();

        this.conversationState = conversationState;
        this.dialogState = conversationState.createProperty("dialogState");
        this.dialogs = new DialogSet(this.dialogState);
        this.dialogs.add(new HelpDialog("help"));

        // Set up the Activity processing

        this.onMessage(async (context: TurnContext): Promise<void> => {
            // TODO: add your own bot logic in here
            if (context.activity.value) {
                switch (context.activity.value.cardAction) {
                  case "newconversation":
                    const channelId = teamsGetChannelId(context.activity);
                    const message = MessageFactory.text("New thread or conversation created by bot");
                    const newConversation = await this.createConversationInChannel(context, channelId, message);
                    break;
                }
            } else {
            switch (context.activity.type) {
                case ActivityTypes.Message:
                    const text: string = context.activity.text.trim().toLowerCase();
                    if (text === "mentionme") {
                    await this.handleMessageMentionMeOneOnOne(context);
                    return;
                    } else if (text.endsWith("mentionme")) {
                    await this.handleMessageMentionMeChannelConversation(context);
                    return;
                    } else if (text.endsWith("hello")) {
                        await context.sendActivity("Oh, hello to you as well!");
                        return;
                    } else if (text.endsWith("help")) {
                        const dc = await this.dialogs.createContext(context);
                        await dc.beginDialog("help");
                        return;
                    } else {
                        const card = CardFactory.adaptiveCard(ResponseCard);
                        await context.sendActivity({ attachments: [card] });
                    }
                    break;
                default:
                    break;
            }
        }
            
            // Save state changes
            return this.conversationState.saveChanges(context);
        });

        this.onConversationUpdate(async (context: TurnContext): Promise<void> => {
            if (context.activity.membersAdded && context.activity.membersAdded.length !== 0) {
                for (const idx in context.activity.membersAdded) {
                    if (context.activity.membersAdded[idx].id === context.activity.recipient.id) {
                        const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
                        await context.sendActivity({ attachments: [welcomeCard] });
                    }
                }
            }
        });

        this.onMessageReaction(async (context: TurnContext): Promise<void> => {
            const added = context.activity.reactionsAdded;
            if (added && added[0]) {
                await context.sendActivity({
                    textFormat: "xml",
                    text: `That was an interesting reaction (<b>${added[0].type}</b>)`
                });
            }
        });
   }

   private async handleMessageMentionMeOneOnOne(context: TurnContext): Promise<void> {
    const mention = {
      mentioned: context.activity.from,
      text: `<at>${new TextEncoder().encode(context.activity.from.name)}</at>`,
      type: "mention"
    };

    const replyActivity = MessageFactory.text(`Hi ${mention.text} from a 1:1 chat.`);
    replyActivity.entities = [mention];
    await context.sendActivity(replyActivity);
  }

   private async handleMessageMentionMeChannelConversation(context: TurnContext): Promise<void> {
    const mention = {
      mentioned: context.activity.from,
      text: `<at>${new TextEncoder().encode(context.activity.from.name)}</at>`,
      type: "mention"
    };

    const replyActivity = MessageFactory.text(`Hi ${mention.text}!`);
    replyActivity.entities = [mention];
    const followupActivity = MessageFactory.text(`*We are in a channel conversation group chat in the !*`);
    await context.sendActivities([replyActivity, followupActivity]);
  }

  private async createConversationInChannel(context: TurnContext, teamsChannelId: string, message: Partial<Activity>): Promise<[ConversationReference, string]> {
    // create parameters for the new conversation
    const conversationParameters = <ConversationParameters>{
                isGroup: true,
                channelData: <TeamsChannelData>{
                  channel: <ChannelInfo>{
                    id: teamsChannelId
                  }
                },
                activity: message
              };
            

    // get a reference to the bot adapter & create a connection to the Teams API
    const adapter = <BotFrameworkAdapter>context.adapter;
    const connectorClient = adapter.createConnectorClient(context.activity.serviceUrl);
    // create a new conversation and get a reference to it
    const conversationResourceResponse: ConversationResourceResponse = await connectorClient.conversations.createConversation(conversationParameters);
    const conversationReference = <ConversationReference>TurnContext.getConversationReference(context.activity);
    conversationReference.conversation.id = conversationResourceResponse.id;

    return [conversationReference, conversationResourceResponse.activityId];
  }


}
