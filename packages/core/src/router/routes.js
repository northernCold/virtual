const modules = import.meta.glob('../demos/*.vue', { eager: true });

const routes = Object.keys(modules).map((key) => {
  const name = modules[key].default?.name.toLowerCase();
  return {
    path: `/${name.toLowerCase()}`,
    component: modules[key].default,
    meta: { title: name },
  }
})

export default routes;