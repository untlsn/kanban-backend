import register from './register';
import login from './login';
import board from './board';
import execAll from '../helpers/execAll';
import task from './task';

export default function endpoints() {
  execAll(register, login, board, task);
}
