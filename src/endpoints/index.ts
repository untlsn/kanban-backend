import register from './register';
import login from './login';
import board from './board';
import execAll from '../helpers/execAll';

export default function endpoints() {
  execAll(register, login, board);
}
