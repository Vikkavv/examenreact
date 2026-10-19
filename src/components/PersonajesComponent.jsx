import React, { Component } from 'react'
import SeriesService from '../Services/SeriesService'

export default class PersonajesComponent extends Component {

  service = new SeriesService();
  state = {
    personajes: [],
    serie: null
  }

  async getAllPersonajesFromPeliculaId() {
    this.setState({
       personajes: await this.service.getPersonajesFromSerieId(this.props.id)
    })
  }

  async getSerieById(){
    this.setState({
      serie: await this.service.getSerieById(this.props.id)
    })
  }

  componentDidMount(){
    this.getAllPersonajesFromPeliculaId();
    this.getSerieById();
  }

  render() {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        {this.state.serie && (
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Personajes
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {this.state.serie.nombre}
            </h1>
          </div>
        )}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Nombre</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Imagen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {
                  this.state.personajes.map((personaje, i) => {
                    return(
                      <tr key={i} className="transition-colors hover:bg-slate-50/70">
                        <td className="px-6 py-5 align-middle text-base font-semibold text-slate-900">
                          {personaje.nombre}
                        </td>
                        <td className="px-6 py-5">
                          <img
                            src={personaje.imagen}
                            alt=""
                            className="h-36 w-56 rounded-xl object-cover shadow-sm"
                          />
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }
}
