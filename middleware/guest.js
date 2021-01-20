export default function ({ store, redirect }) {
  if (!store.getters['auth/authenticated'])
    return;
  return redirect('/home');
}
