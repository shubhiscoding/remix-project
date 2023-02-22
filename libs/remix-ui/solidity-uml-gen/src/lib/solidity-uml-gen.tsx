import React, { Fragment, useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { ThemeSummary } from '../types'
import UmlDownload from './components/UmlDownload'
import './css/solidity-uml-gen.css'
export interface RemixUiSolidityUmlGenProps {
  updatedSvg?: string
  loading?: boolean
  themeSelected?: string
  themeName: string
  themeCollection: ThemeSummary[]
}

interface ActionButtonsProps {
  actions: {
    zoomIn: () => void,
    zoomOut: () => void,
    resetTransform: () => void
  }
}

const _paq = window._paq = window._paq || []



export function RemixUiSolidityUmlGen ({ updatedSvg, loading }: RemixUiSolidityUmlGenProps) {
  const [showViewer, setShowViewer] = useState(false)
  const [validSvg, setValidSvg] = useState(false)

  useEffect(() => {
    setValidSvg (updatedSvg.startsWith('<?xml') && updatedSvg.includes('<svg')) 
    setShowViewer(updatedSvg.startsWith('<?xml') && updatedSvg.includes('<svg'))
  }
  , [updatedSvg])


  const encoder = new TextEncoder()
  const data = encoder.encode(updatedSvg)
  const final = btoa(String.fromCharCode.apply(null, data))

  const downloadAsPng = () => {
    // convert serialized svg to png and download

  }

  const downloadAsPdf = () => {
    // convert serialized svg to pdf and download
  }

  function ActionButtons({ actions: { zoomIn, zoomOut, resetTransform }}: ActionButtonsProps) {
  
    return (
      <>
        <div
          className="position-absolute bg-transparent mt-2"
          id="buttons"
          style={{ zIndex: 3, top: "10", right: "2em" }}
        >
          <div className="py-2 px-2 d-flex justify-content-center align-items-center">
            <UmlDownload downloadAsPdf={downloadAsPdf} downloadAsPng={downloadAsPng} />
            <button
              className="badge badge-info remixui_no-shadow p-2 rounded-circle mr-2"
              onClick={() => zoomIn()}
            >
              <i className="far fa-plus "></i>
            </button>
            <button
              className="badge badge-info remixui_no-shadow p-2 rounded-circle mr-2"
              onClick={() => zoomOut()}
            >
              <i className="far fa-minus align-item-center d-flex justify-content-center"></i>
            </button>
            <button
              className="badge badge-info remixui_no-shadow p-2 rounded-circle mr-2"
              onClick={() => resetTransform()}
            >
              <i className="far fa-undo align-item-center d-flex justify-content-center"></i>
            </button>
          </div>
        </div>
      </>
    )
  }

  const DefaultInfo = () => (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5 ml-5">
      <h3 className="h3 align-self-start text-dark"><p>To view your contract as a UML Diagram</p></h3>
      <ul className="ml-3 justify-content-start align-self-start">
        <li>
          <h5 className="h5 align-self-start text-dark"><p>Right click on your contract file</p></h5>
        </li>
        <li>
          <h5 className="h5 align-self-start text-dark"><p>Click on <b>Generate UML</b></p></h5>
        </li>
      </ul>
    </div>
  )
  const Display = () => {
    return (
      <div id="umlImageHolder" className="w-100 px-2 py-2 d-flex">
        { validSvg && showViewer ? (
          <TransformWrapper
            initialScale={1}
          >
            {
              ({ zoomIn, zoomOut, resetTransform }) => (
                <Fragment>
                  <ActionButtons actions={{ zoomIn, zoomOut, resetTransform }} />
                  <TransformComponent contentStyle={{ zIndex: 2 }}>
                    <img
                      id="umlImage"
                      src={`data:image/svg+xml;base64,${final}`}
                      width={'100%'}
                      height={'auto'}
                      className="position-relative"
                    />
                  </TransformComponent>
                </Fragment>
              )
            }
          </TransformWrapper>
        ) : loading ? <div className="justify-content-center align-items-center d-flex  mx-auto my-auto">
            <i className="fas fa-spinner fa-spin fa-4x"></i>
          </div> : <DefaultInfo />}
      </div>
  )}
  return (<>
    { <Display /> }
    </>
  )
}

export default RemixUiSolidityUmlGen