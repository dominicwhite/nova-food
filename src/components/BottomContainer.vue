<template>
    <v-bottom-sheet id="bottom-container" hide-overlay persistent value="true">
        <v-expansion-panel>
            <v-expansion-panel-content
                    expand-icon="mdi-menu-up"
            >
                <div slot="header">Restaurants</div>
                <v-list>
                    <v-list-tile
                            v-for="(restaurant, i) in restaurants"
                            :key="i"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title v-text="restaurant.name"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
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
                sheet: true
            }
        },
        props: ['restaurants']
    }
</script>

<style scoped>
.bottom-container {
    z-index: 1001;
}
</style>