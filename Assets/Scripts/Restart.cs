using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Restart : MonoBehaviour
{
   public GameObject[] circles;
    public LineRenderer L;

    private void Start()
    {
        Button restartbut = GetComponent<Button>();
        restartbut.onClick.AddListener(restart);
    }

    private void restart()
    {
        foreach (GameObject circle in circles) circle.SetActive(true);
        

        
            L.positionCount = 0;
        
    }
}
