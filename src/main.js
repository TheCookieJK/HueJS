import Bridge from './core/bridge';
import Lights from './core/lights';
import Groups from './core/groups';
import Scenes from './core/scenes';
import * as config from '../package.json';

export const bridge = new Bridge();
export const lights = new Lights();
export const groups = new Groups();
export const scenes = new Scenes();


export { group } from './core/group';
export { light } from './core/light';

export const version = () => {
    return config.version;
}