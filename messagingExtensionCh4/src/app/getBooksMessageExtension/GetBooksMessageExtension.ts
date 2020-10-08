import * as debug from "debug";
import { PreventIframe } from "express-msteams-host";
import {
    TurnContext, CardFactory, MessagingExtensionAttachment, MessagingExtensionQuery,
    MessagingExtensionResult, AppBasedLinkQuery
} from "botbuilder";


import { IMessagingExtensionMiddlewareProcessor } from "botbuilder-teams-messagingextensions";
import { TaskModuleRequest, TaskModuleContinueResponse } from "botbuilder";
// Initialize debug logging module
const log = debug("msteams");


@PreventIframe("/getBooksMessageExtension/config.html")
@PreventIframe("/getBooksMessageExtension/action.html")
export default class GetBooksMessageExtension implements IMessagingExtensionMiddlewareProcessor {

    public async onFetchTask(context: TurnContext, value: MessagingExtensionQuery): Promise<MessagingExtensionResult | TaskModuleContinueResponse> {
        return Promise.resolve<TaskModuleContinueResponse>({
            type: "continue",
            value: {
                title: "ISBN Number Selector",
                card: CardFactory.adaptiveCard({
                    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                    type: "AdaptiveCard",
                    version: "1.0",
                    body: [
                        {
                            type: "TextBlock",
                            text: "Please enter an ISBN Number"
                        },
                        {
                            type: "Input.Text",
                            id: "isbn",
                            placeholder: "ISBN Number ISBN:9780789748591",
                            style: "email"
                        },
                    ],
                    actions: [
                        {
                            type: "Action.Submit",
                            title: "OK",
                            data: { id: "unique-id" }
                        }
                    ]
                })
            }
        });

    }


    // handle action response in here
    // See documentation for `MessagingExtensionResult` for details
    public async onSubmitAction(context: TurnContext, value: TaskModuleRequest): Promise<MessagingExtensionResult> {

        const request = require("request");
        const isbnnumber = value.data.isbn;
        const url = "https://www.googleapis.com/books/v1/volumes?q=" + isbnnumber + "&limit=1&offset=0";

        let title: string = "";
        let description: string = "";
        let publisher: string = "";
        let imageurl: string = "";
        let messagingExtensionResult;

        return new Promise<MessagingExtensionResult>((resolve, reject) => {
            request(url, { json: true }, (err, res, body) => {
                if (err) {
                    return;
                }
                const data = body;
                if (data.items) {
                    const item = data.items[0];
                    title = item.volumeInfo.title;
                    description = item.volumeInfo.description;
                    publisher = item.volumeInfo.publisher;
                    imageurl = item.volumeInfo.imageLinks.thumbnail;
                }
                const card = CardFactory.adaptiveCard(
                    {
                        type: "AdaptiveCard",
                        body: [
                            {
                                type: "Image",
                                url: imageurl
                            },
                            {
                                type: "TextBlock",
                                size: "Large",
                                text: "Title: " + title
                            },
                            {
                                type: "TextBlock",
                                size: "Medium",
                                text: description
                            },
                            {
                                type: "TextBlock",
                                size: "Medium",
                                text: "Publisher: " + publisher
                            },
                            {
                                type: "TextBlock",
                                size: "Medium",
                                text: "ISBN Number: " + isbnnumber
                            }
                        ],
                        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                        version: "1.0"
                    });

                messagingExtensionResult = {
                    type: "result",
                    attachmentLayout: "list",
                    attachments: [card]
                };
                resolve(messagingExtensionResult);

            });
        });
    }

    public async onQuery(context: TurnContext, query: MessagingExtensionQuery): Promise<MessagingExtensionResult> {
        let isbnnumber = "ISBN:9780789748591";
        if (query && query.parameters && query.parameters[0].name === "searchKeyword" && query.parameters[0].value) {
            isbnnumber = query.parameters[0].value;
        }

        const request = require("request");
        const url = "https://www.googleapis.com/books/v1/volumes?q=" + isbnnumber + "&limit=10&offset=0";

        let messagingExtensionResult;
        const attachments: MessagingExtensionAttachment[] = [];

        return new Promise<MessagingExtensionResult>((resolve, reject) => {
            request(url, { json: true }, (err, res, body) => {
                if (err) {
                    return;
                }
                const data = body;

                const searchResultsCards: MessagingExtensionAttachment[] = [];
                data.items.forEach((book) => {
                    searchResultsCards.push(this.getBookResultCard(book));
                });

                messagingExtensionResult = {
                    type: "result",
                    attachmentLayout: "list",
                    attachments: searchResultsCards
                };

                resolve(messagingExtensionResult);

            });
        });

    }

    public async onQueryLink(context: TurnContext, query: AppBasedLinkQuery): Promise<MessagingExtensionResult> {

        let messagingExtensionResult;
        const attachments: MessagingExtensionAttachment[] = [];
        const url: any = query.url;
        const attachment = CardFactory.thumbnailCard(
            "Link unfurling", url, ["http://jenkinsblogs.com/wp-content/uploads/2018/04/cropped-icon.png"]);

        messagingExtensionResult = {
            attachmentLayout: "list",
            type: "result",
            attachments: [attachment]
        };

        return messagingExtensionResult;
    }

    private getBookResultCard(selectedBook: any): MessagingExtensionAttachment {
        return CardFactory.heroCard(selectedBook.volumeInfo.title, selectedBook.volumeInfo.description);
    }

}
