import { Component } from 'react'

export default class HomeComponent extends Component {
  render() {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="relative isolate overflow-hidden rounded-3xl bg-slate-900 shadow-xl shadow-slate-300/50">
          <img
            src="https://appseries.azurewebsites.net/static/media/seriestv.e0b0894681a8624917c1.jpg"
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-900/65 to-slate-900/20" />
          <div className="flex min-h-[28rem] items-end px-8 py-10 sm:px-12 sm:py-14">
            <div className="max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                Tu espacio de entretenimiento
              </p>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Series Manager
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-200">
                Explora tus series favoritas y descubre los personajes que forman parte de cada historia.
              </p>
            </div>
          </div>
        </section>
      </main>
    )
  }
}
