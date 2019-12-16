<template>
    <v-container>
        <v-layout row wrap>
        <v-flex x6 md3>
            <h5 class="mt-3">Companies</h5>
            
        </v-flex>
        <v-flex class="mb-3" offset-sm-7 x6 md4>
                <v-text-field
        append-icon="search"
        label="Search"
        v-model="search"
        hide-details
      ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout >
        <v-flex >
             <v-data-table :headers="headers" :items="companies" :search="search">
                 <template v-slot:item.action="{ item }">
                     <v-icon class="pl-1"
       @click="show(item)"
       >list</v-icon>
        
                 </template>
                 <template v-slot:no-data>
      <v-btn color="primary">Reset</v-btn>
    </template>
                     
                
             </v-data-table>
              <v-dialog
      v-model="dialog"
      width="500"
    >
      
      <v-card>
        <v-card-title
          class="primary white--text"
          primary-title
        >
          Details
        </v-card-title>
        <v-layout v-if="img">
            <v-flex xs6 md5 class="ml3">
        <v-card-text>
           Name: {{comp.name}}
        
        </v-card-text>
        <v-card-text>
           City: {{comp.city}}
        
        </v-card-text>
        <v-card-text>
           Service: {{comp.service}}
        
        </v-card-text>
          <v-card-text>
             Phoneno: {{comp.phoneno}}
        
        </v-card-text>
        <v-card-text>
           Email: {{comp.email}}
        
        </v-card-text>
        
        <v-card-text v-if="thirdemaildisplay">
          third Email: {{comp.email3}}
        </v-card-text>
         
        
            </v-flex>
            <v-flex xs6 m6 class="mt-2">
                    <div v-if="img">
                        <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      v-if="progress"
    ></v-progress-circular>
                <v-img v-if="!progress" :src="'http://localhost:3000/api/containers/company/download/' + comp.image"/>
                    </div>
                 <v-card-text v-if="secondphonedisplay">
            second Phoneno: {{comp.phoneno2}}
        
            </v-card-text>
            <v-card-text v-if="thirdphonedisplay">
            third Phoneno: {{comp.phoneno3}}
        
            </v-card-text>
              
           
                <!-- <v-flex >
                <v-card-text style="margin-top:100px;"  v-if="noimg" class="text-center">No image preview for this company</v-card-text>
                </v-flex> -->
            </v-flex>
        </v-layout>
        <v-layout v-if="noimg" row wrap>
            <v-flex xs6 md5 class="ml-3">
                <v-card-text>
           Name: {{comp.name}}
        
        </v-card-text>
        <v-card-text>
           City: {{comp.city}}
        
        </v-card-text>
        <v-card-text>
           Service: {{comp.service}}
        
        </v-card-text>
         <v-card-text>
           Phoneno: {{comp.phoneno}}
        
        </v-card-text>
               <v-card-text>
           Email: {{comp.email}}
        
        </v-card-text>
        <v-card-text v-if="secondemaildisplay">
          second Email: {{comp.email2}}
        
        </v-card-text>
            </v-flex>
            <v-flex xs6 md5>
         
        <v-card-text v-if="thirdemaildisplay">
          third Email: {{comp.email3}}
        </v-card-text>
        
        <v-card-text v-if="secondphonedisplay">
          second Phoneno: {{comp.phoneno2}}
        
        </v-card-text>
        <v-card-text v-if="thirdphonedisplay">
           third Phoneno: {{comp.phoneno3}}
        
        </v-card-text>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" v-if="map" @click="showMap(comp)"><v-icon>map</v-icon></v-btn>
          <v-btn
            color="primary"
            @click="cancelClicked"
           
          >
          Cancel
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-flex>
        </v-layout>
    </v-container>
</template>
<style>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .05);
}
td,th{
    border: 1px solid rgba(0, 0, 0, .05);
}
</style>
<script>
import axios from 'axios';
const api = 'http://localhost:3000/api/companies';
export default {
    
    data(){
        return{
             img:false,
             noimg:false,
             map:false,
             progress:false,
            search:'',
              dialog:false,
              headers:[
                {
                    text:'name',value:'name'
                },
                {
                    text:'city',value:'city'
                },
                {
                    text:'service',value:'service'
                },
                { text: 'Actions', value: 'action', sortable: false },
               
            ],
             companies:[],
              comp:{
               
                 name:'',
                service:'',
                city:'',
                image:'',
                phoneno:'',
                email:'',
                latitude:'',
                longitude:''
        },
         secondphonedisplay:false,
             thirdphonedisplay:false,
             secondemaildisplay:false,
             thirdemaildisplay:false,
    }
    },
    
    methods:{
        getCompany(){
            axios.get(api)
            .then((res)=>{
                this.companies = res.data;
            }).catch(()=>{

            })
        },
        show(item){
            axios.get(api + '/' + item.id)
            .then((res)=>{
                this.comp = res.data;
                if(this.comp.phoneno2!==''){
                    this.secondphonedisplay = true;
                }
                if(this.comp.phoneno3!==''){
                    this.thirdphonedisplay = true;
                }
                if(this.comp.email2!==''){
                    this.secondemaildisplay = true;
                }
                if(this.comp.email3!==''){
                    this.thirdemaildisplay = true;
                }
                if(this.comp.image!==''){
                    this.img = true;
                    this.progress = true;
                }
                else{
                    this.noimg = true;
                }
                if((parseInt(this.comp.latitude)!==0) && (parseInt(this.comp.longitude))!==0){
                    this.map = true;
                }
                this.dialog = true;
                
                this.showProgress();

            })
        },
        showMap(item){
            const mapurl = "https://www.google.com/maps/search/";
            axios.get(api+'/' + item.id)
            .then((res)=>{
                this.comp = res.data;
                window.open(mapurl + this.comp.name + '/' + parseFloat(this.comp.latitude) + '/' + parseFloat(this.comp.longitude),'_blank');
            })
        },
        showProgress(){
            setTimeout(() => {
                  this.progress = false
                 
                },3000)
        },
        cancelClicked(){
            this.dialog = false;
            this.img = false;
            this.noimg = false; 
            this.map = false;
            this.secondphonedisplay = false;
            this.secondemaildisplay = false;
            this.thirdphonedisplay = false;
            this.thirdemaildisplay = false;
         
        },
    },
    mounted(){
       this.getCompany();
    }
}
</script>
