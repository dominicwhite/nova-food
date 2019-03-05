<template>
    <v-bottom-sheet id="bottom-container" v-model="restaurantSheet" hide-overlay inset persistent>
        <v-expansion-panel>
            <v-expansion-panel-content class="scroll" v-for="restaurant in sheetRestaurants" :key="restaurant.id">
                <div slot="header">
                    <span class="subheading">{{restaurant.name}}</span>
                </div>

                    <v-card
                            v-for="inspection in restaurantInspections[restaurant.id]"
                            class="px-4"
                    >
                        <v-card-title class="pa-1"
                                      style="border-top: thin lightgray solid;"
                        >
                            <span class="body-2">Inspected on: {{inspection.month}}.{{inspection.day}}.{{inspection.year}}</span>
                        </v-card-title>
                        <v-card-text class="py-1">
                            <i>Code violations:</i>
                            <template v-if="inspection.codes">
                                <v-chip
                                        v-for="code in inspection.codes.split(';')"
                                        class="pa-0 ma-0 mr-1"
                                >
                                    {{code}}
                                </v-chip>
                            </template>
                            <template v-else>None</template>
                            <template v-if="inspection.comment"><br><i>Comment:</i> {{inspection.comment}}</template>
                        </v-card-text>
                    </v-card>

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