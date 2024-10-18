//
//  Screen1ViewController.swift
//  ExpoSandbox
//
//  Created by Марина Чемезова on 16.10.2024.
//

import UIKit

class Screen1ViewController: UIViewController {
  
  @objc
  static func loadFromNib() -> Screen1ViewController {
    return Screen1ViewController(nibName: String(describing: Self.self), bundle: nil)
  }
  
  /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
