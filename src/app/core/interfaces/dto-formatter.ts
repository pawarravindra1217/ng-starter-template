import { Resource } from "../models/Resource";

export interface DTOFormatter {
    createPostData(resource: Resource): any;
    formatGetData(json: any): Resource;
}