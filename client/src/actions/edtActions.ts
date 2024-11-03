// edtActions.ts
export const ADD_EVENT = 'ADD_EVENT';
export const MOVE_EVENT = 'MOVE_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const SET_EVENTS = 'SET_EVENTS';
export interface Event {
  id: string;
  title: string;
  professor: string;
  color: string;
  day: string;
  hour: number;
}
export interface AddEventAction {
  type: typeof ADD_EVENT;
  payload: Event;
}
export interface MoveEventAction {
  type: typeof MOVE_EVENT;
  payload: {
    draggableId: string;
    updatedEvent: Event;
  };
}
export interface UpdateEventAction {
  type: typeof UPDATE_EVENT;
  payload: Event;
}
export interface SetEventsAction {
  type: typeof SET_EVENTS;
  payload: Event[];
}
export type EdtActionTypes = 
  | AddEventAction 
  | MoveEventAction 
  | UpdateEventAction 
  | SetEventsAction;