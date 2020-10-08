"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileInfoCard {
    constructor(session) {
        this.session = session;
        this.data = {
            contentType: "application/vnd.microsoft.teams.card.file.info",
            content: {}
        };
    }
    name(name) {
        this.data.name = name;
        return this;
    }
    contentUrl(url) {
        this.data.contentUrl = url;
        return this;
    }
    uniqueId(uniqueId) {
        this.data.content.uniqueId = uniqueId;
        return this;
    }
    fileType(fileType) {
        this.data.content.fileType = fileType;
        return this;
    }
    toAttachment() {
        return this.data;
    }
    static fromFileUploadInfo(uploadInfo) {
        return new FileInfoCard()
            .name(uploadInfo.name)
            .contentUrl(uploadInfo.contentUrl)
            .uniqueId(uploadInfo.uniqueId)
            .fileType(uploadInfo.fileType);
    }
}
exports.FileInfoCard = FileInfoCard;
