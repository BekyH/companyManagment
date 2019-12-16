<template>
  <v-app>
   <compheader/>
    <v-content>
 <router-view/>
    </v-content>
    <compfooter/>
  </v-app>
</template>

<script>


export default {
  name: 'App',


  data: () => ({
    //
  }),
};
</script>
