<template>
    <v-bottom-sheet id="bottom-container" v-model="restaurantSheet" hide-overlay>
        <v-list>

        </v-list>
    </v-bottom-sheet>
</template>

<script>
    export default {
        name: "BottomContainer",
        data: function(){
            return {
                sheet: false
            }
        },
        computed:{
            restaurantSheet: {
                get: function() {
                    return this.$store.state.isPinSelected;
                },
                set: function() {
                    this.$store.commit('deselectPin');
                }
            }
        }
    }
</script>

<style scoped>
/*.bottom-container {*/
    /*z-index: 1001;*/
/*}*/
</style>