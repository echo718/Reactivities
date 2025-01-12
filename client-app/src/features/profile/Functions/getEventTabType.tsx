import { EventsDic } from './profileDics';

export const getEventTabType = (tabLabelName: string) => {
    var eventTabType = EventsDic.future.tabType;
    switch (tabLabelName) {
        case EventsDic.past.tabName:
            eventTabType = EventsDic.past.tabType;
            break;
        case EventsDic.hosting.tabName:
            eventTabType = EventsDic.hosting.tabType;
            break;
        default:
    }
    return eventTabType;
};
