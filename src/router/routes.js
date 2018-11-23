
const routes = [
  {
    path: '/',
    component: () => import('pages/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: 'home', component: () => import('pages/Home.vue') },
      { path: 'altersrente', component: () => import('pages/Altersrente.vue') },
      { path: 'erwerbsminderung', component: () => import('pages/Erwerbsminderungsrente.vue') },
      { path: 'hinterbliebenenrente', component: () => import('pages/Hinterbliebenrente.vue') },
      { path: 'hinweise', component: () => import('pages/Hinweise.vue') },
      { path: 'auswertung', component: () => import('pages/Auswertung.vue') },
      { path: 'eingabe', component: () => import('pages/Einstellung.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
