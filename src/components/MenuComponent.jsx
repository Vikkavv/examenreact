import { Component } from 'react'
import SeriesService from '../Services/SeriesService'
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Crear Personaje', href: '/CreatePersonaje' },
  { label: 'Modificar personaje', href: '/UpdatePersonaje' }
]

export default class MenuComponent extends Component {

    service = new SeriesService();
    state = {
        series: null,
        dropdownOpen: false
    }

    toggleDropdown = () => {
        this.setState(({ dropdownOpen }) => ({
            dropdownOpen: !dropdownOpen
        }))
    }

    getAllSeries = async () => {
        this.setState({
            series: await this.service.getAllSeries()
        })
    }

    componentDidMount(){
        this.getAllSeries();
    }

  render() {
    return (
      <header className="w-full border-b border-slate-200 bg-white shadow-sm">
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-4"
        >
          <NavLink
            to="/"
            className="shrink-0 text-xl font-bold tracking-tight text-slate-900"
          >
            Series Manager
          </NavLink>

          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-x-2 gap-y-2">
            {links.map(({ label, href }) => (
              <NavLink
                key={label}
                to={href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {label}
              </NavLink>
            ))}
          </div>

            {
                this.state.series &&
                <div className="relative shrink-0">
                    <button
                        type="button"
                        onClick={this.toggleDropdown}
                        aria-expanded={this.state.dropdownOpen}
                        aria-controls="series-dropdown"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Series
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`h-4 w-4 transition-transform ${this.state.dropdownOpen ? 'rotate-180' : ''}`}
                        >
                            <path fillRule="evenodd" d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {this.state.dropdownOpen && (
                        <ul
                            id="series-dropdown"
                            className="absolute right-0 z-20 mt-2 max-h-72 w-56 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg ring-1 ring-black/5"
                        >
                            {this.state.series.length > 0 ? (
                                this.state.series.map((serie) => (
                                    <li key={serie.idSerie}>
                                        <NavLink
                                            to={"/Serie/" + serie.idSerie}
                                            onClick={() => this.setState({ dropdownOpen: false })}
                                            className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-indigo-600"
                                        >
                                            {serie.nombre}
                                        </NavLink>
                                    </li>
                                ))
                            ) : (
                                <li className="px-3 py-2 text-sm text-slate-500">
                                    No hay series disponibles
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            }
        </nav>
      </header>
    )
  }
}
