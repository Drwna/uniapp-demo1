// stores/counter.js
import { defineStore } from 'pinia';

export const useAppInfoStore = defineStore('counter', {
	state: () => {
		return { 
         currentVersion: '',
         newestVersion: '',
         upgradeState: {
            isLoading: false,
            percent: 0,
            desc: '部分问题修复和功能优化'
         }
      }
   }
})
