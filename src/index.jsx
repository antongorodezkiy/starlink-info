import React from 'react'
import ReactDOM from 'react-dom'

import Sidebar from './components/Sidebar/Sidebar'
import Map from './components/Map/Map'

import './index.css'

const App = function() {
  return (
    <>
      <div className="group/sidebar-wrapper bg-sidebar flex min-h-svh w-full">
        <aside className="group peer text-sidebar-foreground hidden md:block">
          <div className="relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"></div>
          <div className="fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]">
            <div className="bg-sidebar flex h-full w-full flex-col"><Sidebar/></div>
          </div>
        </aside>
        <main className="bg-background relative overflow-hidden flex w-full flex-1 flex-col md:m-2 md:ml-0 md:rounded-xl md:shadow-sm md:peer-data-[state=collapsed]:ml-2">
          <Map/>
        </main>
      </div>
    </>
  )
}

const view = App('starlinkInfo')

const element = document.getElementById('app')
ReactDOM.render(view, element)
