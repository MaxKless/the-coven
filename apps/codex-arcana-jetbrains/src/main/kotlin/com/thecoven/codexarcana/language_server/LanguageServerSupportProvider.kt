package com.thecoven.codexarcana.language_server

import com.intellij.execution.ExecutionException
import com.intellij.execution.configurations.GeneralCommandLine
import com.intellij.javascript.nodejs.interpreter.NodeCommandLineConfigurator
import com.intellij.javascript.nodejs.interpreter.NodeJsInterpreterManager
import com.intellij.lang.javascript.service.JSLanguageServiceUtil
import com.intellij.openapi.project.Project
import com.intellij.openapi.vfs.VirtualFile
import com.intellij.platform.lsp.api.LspServerSupportProvider
import com.intellij.platform.lsp.api.LspServerDescriptor
import com.intellij.util.application
import java.io.File

class LanguageServerSupportProvider: LspServerSupportProvider {
  override fun fileOpened(
    project: Project,
    file: VirtualFile,
    serverStarter: LspServerSupportProvider.LspServerStarter
  ) {
    val ext = file.extension
    if(ext != null && ext.endsWith("js")) {
      serverStarter.ensureServerStarted(CodexArcanaLspServerDescriptor(project))
    }
  }
}


private class CodexArcanaLspServerDescriptor(project: Project) : LspServerDescriptor(project,"Codex Arcana Language Server") {
  override fun isSupportedFile(file: VirtualFile) = file.extension.let { it != null && it.endsWith("js") }

  override fun createCommandLine(): GeneralCommandLine {
    val lsp =
      JSLanguageServiceUtil.getPluginDirectory(this.javaClass, "language-server/main.js")
    if (lsp == null || !lsp.exists()) {
      throw ExecutionException("Language server not found")
    }

    return GeneralCommandLine().apply {
      withParentEnvironmentType(GeneralCommandLine.ParentEnvironmentType.CONSOLE)
      if (application.isInternal) {
        withEnvironment("NODE_OPTIONS", "--inspect=6009 --enable-source-maps")
      }
      withCharset(Charsets.UTF_8)
      workDirectory = File(project.basePath)
      addParameter(lsp.path)
      addParameter("--stdio")

      val nodeInterpreter = NodeJsInterpreterManager.getInstance(project).interpreter ?: throw ExecutionException("Node interpreter not configured")
      NodeCommandLineConfigurator.find(nodeInterpreter).configure(this)
    }
  }
}
