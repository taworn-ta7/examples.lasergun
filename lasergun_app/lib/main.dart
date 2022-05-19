import 'package:flutter/material.dart';
import './i18n/strings.g.dart';
import './loggings.dart';
import './app_localization.dart';
import './app.dart';

/// Main program.
void main() {
  // initialize loggings
  Logger.root.level = Level.ALL;
  Logger.root.onRecord.listen(
    // ignore: avoid_print
    (record) => print(
      "${record.time} ${record.level.name.padRight(7)} ${record.loggerName.padRight(12).characters.take(12)} ${record.message}",
    ),
  );

  // initialize localization
  WidgetsFlutterBinding.ensureInitialized();
  LocaleSettings.useDeviceLocale();
  LocaleSettings.setLocaleRaw(AppLocalization.instance().current.languageCode);

  // run app
  runApp(TranslationProvider(child: const App()));
}
