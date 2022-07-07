import zhRequest from "../..";
import { IDataType } from "../../types";

export function getPageListData(url: string, queryInfo: any) {
  return zhRequest.post<IDataType>({
    url: url,
    data: queryInfo,
  });
}

// url: /users/id
export function deletePageData(url: string) {
  return zhRequest.delete<IDataType>({
    url: url,
  });
}

export function createPageData(url: string, newData: any) {
  return zhRequest.post<IDataType>({
    url: url,
    data: newData,
  });
}

export function editPageData(url: string, editData: any) {
  return zhRequest.patch<IDataType>({
    url: url,
    data: editData,
  });
}
