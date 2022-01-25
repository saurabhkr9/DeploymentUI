const contextURL = process.env.REACT_APP_SERVICE_URL

const APIs = {
    ITSM_TOOLS : `${contextURL}/itsm-tools`,
    DO_NOTIFICATION_CHANNEL : `${contextURL}/do-notification-channels`,
    TOOL_MASTER : `${contextURL}/tool-master`,
    PRODUCT_MODULE : `${contextURL}/product-modules`,
    USERS : `${contextURL}/users`,
    MASTER_CONFIGURATION : `${contextURL}/master-configuration`,
    MENU : `${contextURL}/menus`,
    PROFILES : `${contextURL}/profile`,
    ROLES : `${contextURL}/role`
}

export {APIs}