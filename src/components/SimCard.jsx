import { toTitleCase } from "lib/utils";

export default function SimCard({ user, module }) {
  return (
    <div className="mb-4">
      <div className="mod-box rounded-lg bg-orange-400 bg-opacity-0 hover:bg-opacity-25 p-1 -mx-1">
        <div className="mod-box-inner rounded-md bg-gradient-to-r from-yellow-100 hover:from-white hover:to-white border border-orange-300 hover:border-orange-500 p-4">
          <div className="flex flex-row items-center">
            <div className="flex flex-col items-center text-sm font-light pr-4">
              <div className="calendar w-auto bg-whites text-xs text-gray-700 text-center rounded-sm borders px-2">
                <p className="uppercase">Selasa</p>
                <p className="text-4xl text-orange-600 font-bold -mt-2 -mb-2">23</p>
                <p className="uppercase">Oktober</p>
                <p className="calendar border-t border-orange-300 pt-1 mt-1 ">Pukul 20:00 WIB</p>
              </div>
            </div>
            <div className="mod-box-right flex-grow text-sm text-gray-700 font-light -my-4 p-4 border-l border-orange-300 hover:border-orange-500">
              <p className="text-2xl text-orange-700 -mt-1s mb-2">{toTitleCase(module.type)}</p>
              <p className="">Jumlah soal: </p>
              <p className="">Rata-rata waktu penyelesaian: -</p>
              <p className="">Maksimum waktu: -</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      .mod-box:hover > .mod-box-inner {
        background-color: white;
      }
      .mod-box:hover .mod-status {
        background-color: #4299e1;
      }
      .mod-box-inner:hover .mod-box-right {
        border-color: #ed8936;
      }
      .mod-box-inner:hover .mod-link {
        border-width: 2px;
      }
      .mod-box:hover .mod-link {
        color: #4299e1;
        border-color: #63b3ed;
      }
      .mod-box:hover .mod-link:hover {
        color: white;
        border-color: #4299e1;
      }
      .mod-box-inner:hover .calendar {
        border-color: #ed8936;
      }
      `}</style>
    </div>
  )
}