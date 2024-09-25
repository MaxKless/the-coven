package com.thecoven.codexarcana.toolwindow

data class SpellcastingData(val ingredients: Array<String>, val incantations: Array<String>, val recipes: Array<Recipe>)

data class Recipe(val name: String, val ingredients: Array<String>, val incantations: Array<String>)