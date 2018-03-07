import Bridge from './core/bridge';
import Lights from './core/lights';
import Groups from './core/groups';

import * as informations from './const/info';

export const bridge = new Bridge();
export const lights = new Lights();
export const groups = new Groups();

export const version = () => {
    return informations.version;
}