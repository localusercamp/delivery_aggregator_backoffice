export default function ({ route, redirect, store }) {
  if (route.fullPath === "/") {
    const user = store.getters['user/user'];
    return redirect(user.startRoute);
  }
}
