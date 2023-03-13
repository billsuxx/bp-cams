import { defineStore } from 'pinia'
import axios from "axios";

const API_BASE = 'https://kozutfigyelo-back.budapestkozut.hu/api/ikszr'

export const useCameraStore = defineStore({
  id: 'camera',
  state: () => ({
    cameras: [],
    pager: {},
    image: null,
    camera: null,
    loading: false,
  }),
  actions: {
    async fetchCameras(page = 1, filter = '', limit = 25) {
      this.cameras = []
      this.pager = {}
      this.loading = true
      try {
        const { data: result } = await axios.post(API_BASE + '/list', {
          filter: filter,
          limit: limit,
          objectType: 'cameras',
          page: page
        })

        this.pager = {
          page: result?.data?.page,
          pages: result?.data?.pages,
          limit: result?.data?.limit,
          total: result?.data?.total,
        }
        this.cameras = result?.data.docs

      } catch (e) {
        console.warn(e)
      }
      finally {
        this.loading = false
      }
    },
    async fetchCameraImage(externalId) {
      this.loading = true
      this.image = null
      try {
        const now = new Date();
        const h = now.getHours().toString().padStart(2,'0')
        const m = now.getMinutes().toString().padStart(2,'0');

        const { data: camera } = await axios.post(API_BASE + '/camerahistoryimage', {
          externalId: externalId,
          time: `${h}:${m}`
        })

        this.image = camera.data

      } catch (e) {
        console.warn(e)
      }
      finally {
        this.loading = false
      }
    },

    async fetchCameraData(externalId) {
      this.loading = true
      this.camera = null
      try {
        const { data: camera } = await axios.post(API_BASE + '/get', {
          externalId: externalId,
          objectType: 'cameras',
        })

        this.camera = camera.data?.instance

      } catch (e) {
        console.warn(e)
      }
      finally {
        this.loading = false
      }
    }

  }

})
