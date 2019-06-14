import {
  ReloadUser,
  RestoreFav,
  LoadLocationPan,
  reloadLocalisation,
  LoadLatestFilters,
  ReloadUX
} from './store';
let done = false;
export async function bootstrap() {
  if (done) {
    return;
  }
  done = true;
  await ReloadUser();
  await RestoreFav();
  await LoadLocationPan();
  await reloadLocalisation();
  await LoadLatestFilters();
  await ReloadUX();
}
