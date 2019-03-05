<template>
    <v-bottom-sheet id="bottom-container" v-model="restaurantSheet" hide-overlay inset persistent>
        <v-expansion-panel>
            <v-expansion-panel-content class="scroll" v-for="restaurant in sheetRestaurants" :key="restaurant.id">
                <div slot="header">
                    {{restaurant.name}}
                </div>
                <v-list three-line>
                    <template
                            v-for="inspection in restaurantInspections[restaurant.id]"
                    >

                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>Inspected on: {{inspection.month}}.{{inspection.day}}.{{inspection.year}}</v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <i>Code violations:</i>
                                    <template v-if="inspection.codes">{{inspection.codes}}</template>
                                    <template v-else>None</template>
                                    <template v-if="inspection.comment"><br><i>Comment:</i> {{inspection.comment}}</template>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>

                        </v-list-tile>
                    </template>
                </v-list>

            </v-expansion-panel-content>
        </v-expansion-panel>
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
                    if (this.$store.state.isClickOnAnotherPin === true){
                        this.$store.commit('clickOffPin');
                    }
                    else {
                        this.$store.commit('deselectPin');
                    }
                }
            },
            sheetRestaurants: function() {
                return this.$store.state.displayRestaurants;
            },
            restaurantInspections: function(){
                return this.$store.state.restaurantInfo;
            }
        }
    }
</script>

<style scoped>
/*.bottom-container {*/
    /*z-index: 1001;*/
/*}*/
.scroll {
    overflow-y: auto;
    max-height: 70%;
}
</style>