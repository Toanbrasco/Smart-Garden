import React, { useState, useReducer, createContext, useEffect } from "react";
import { CONFIG_GET, CONFIG_FAIL, CONFIG_REFESH } from './Reducers/type'
import { configReducer } from "./Reducers/ConfigReducer";
import axios from "axios";
import { UrlApi } from "../Constants";

export const ConfigContext = createContext()

const ConfigContextProvider = ({ children }) => {
    // const [Configs, setConfigs] = useState([])
    const [config, configDispart] = useReducer(configReducer, {
        loading: true,
        data: {}
    })
    const getConfig = async () => {
        refeshConfig()
        try {
            const response = await axios.get(`${UrlApi}/api/config`)
            if (response.data.success) {
                configDispart({ type: CONFIG_GET, payload: response.data })
            }
        } catch (error) {
            configDispart({ type: CONFIG_FAIL, payload: error })
        }
    }

    const updateConfig = async (id, type, info) => {
        try {
            const response = await axios.put(`${UrlApi}/api/config/update`, { _id: id, type: type, data: info })
            return response.data
        } catch (error) {
            configDispart({ type: CONFIG_FAIL, payload: error })
            return error
        }
    }

    const refeshConfig = () => {
        configDispart({ type: CONFIG_REFESH })
    }


    const ConfigContextData = {
        config,
        getConfig,
        updateConfig,
        refeshConfig,
        configDispart
    }

    return (
        <ConfigContext.Provider value={ConfigContextData}>
            {children}
        </ConfigContext.Provider>
    )
}

export default ConfigContextProvider