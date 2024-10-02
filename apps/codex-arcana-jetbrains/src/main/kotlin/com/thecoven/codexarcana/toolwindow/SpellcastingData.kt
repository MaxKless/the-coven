package com.thecoven.codexarcana.toolwindow

import kotlinx.serialization.Serializable

data class SpellcastingData(val ingredients: Array<String>, val incantations: Array<String>, val recipes: Array<Recipe>)

@Serializable
data class Recipe(val id: String, val name: String, val type: String, val ingredients: Array<String>, val incantations: Array<String>)
