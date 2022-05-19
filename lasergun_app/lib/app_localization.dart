import 'package:flutter/material.dart';
import './i18n/strings.g.dart';
import './loggings.dart';
import './app.dart';

/// AppLocalization class.
class AppLocalization {
  static AppLocalization? _instance;

  static AppLocalization instance() {
    _instance ??= AppLocalization();
    return _instance!;
  }

  // ----------------------------------------------------------------------

  static final log = Logger('AppLocalization');

  /// Construction.
  AppLocalization();

  /// Supported locale list.
  final list = const [
    Locale('en'),
    Locale('th'),
  ];

  /// Current locale.
  Locale get current => list[_index];
  int _index = 0;

  /// Change current locale.
  void changeLocale(BuildContext context, String locale) {
    late int i;
    switch (locale) {
      case 'th':
        i = 1;
        break;

      case 'en':
      case '':
      default:
        i = 0;
        break;
    }

    if (_index != i) {
      _index = i;
      log.info("change locale to $locale");
      LocaleSettings.setLocaleRaw(locale);
      App.refresh(context);
    }
  }
}
