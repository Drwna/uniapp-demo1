// stores/counter.js
import { defineStore } from 'pinia';

export const useAppInfoStore = defineStore('counter', {
	state: () => {
		return { 
      currentVersion: '',
      newestVersion: ''
     };
	},
});
