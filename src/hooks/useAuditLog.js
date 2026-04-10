import { useEffect } from "react";

import { logUserAction } from "../services/auditService";

export const useAuditLog = (pageName, payload = {}) => {

useEffect(() => {

logUserAction({

action: "PAGE_VISIT",

page: pageName,

payload

});

}, []);

};